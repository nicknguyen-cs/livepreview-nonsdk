import React, { useState, useEffect } from 'react';
import { onEntryChange } from './api/livepreview';
import { Stack } from './api/contentstack';

function ContentFetcher() {
  const [content, setContent] = useState({ title: '', description: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const entry = await Stack.ContentType('simple_live_preview').Entry("blt6b824a6b66b3592d").toJSON().fetch();
      setContent({ title: entry.title, description: entry.description });
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  // SDK Handles entry_uid. This will need to be fetched and handled by code. Not yet implemented
  const fetchLivePreviewData = async (live_preview, contentTypeUid) => {
    fetch(`http://localhost:3001/live-preview?live_preview=${live_preview}&content_type_uid=${contentTypeUid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Adjust this line if you expect a different response type
      })
      .then(data => {
        setContent({ title: data.entry.title, description: data.entry.description })
      })
      .catch(error => {
        console.error('Error:', error);
      })
  }


  useEffect(() => {
    fetchData();

    const messageToContentstack = {
      from: "live-preview",
      type: "init",
      data: {
        config: {
          href: window.location.href,
        },
      },
    };

    window.parent.postMessage(messageToContentstack, "*");
    window.addEventListener("message", async (e) => {

      const { data, from, type } = e.data;
      const isPreviewAvailable =
        data?.hash &&
        from === "live-preview" &&
        type === "client-data-send" &&
        data.content_type_uid
      if (isPreviewAvailable) {
        fetchLivePreviewData(data.hash, data.content_type_uid)
      }
      // Cleanup function to remove event listener
      return () => {
        window.removeEventListener("message", e);
      };
    });
  }, []); // Empty dependency array means this effect runs only once on mount

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <ContentFetcher />
    </div>
  );
}

export default App;
