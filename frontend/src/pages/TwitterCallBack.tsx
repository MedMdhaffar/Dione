import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const BACK_SERVER_IP = import.meta.env.VITE_BACK_SERVER_IP;
const TwitterCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");

    if (code && state) {
      fetch(`${BACK_SERVER_IP}/post/twitter/callback?code=${code}&state=${state}`)
        .then(res => res.json())
        .then(data => {
            console.log("Success:", data);
            if (data.success) {
                navigate('/success', {
                state: {
                    status: 'success',
                    message: 'Tweet posted successfully!',
                },
                });
            } else {
                navigate('/success', {
                state: {
                    status: 'error',
                    message: data.error || 'Unknown error occurred.',
                },
                });
            }
            })
        .catch(err => {
          console.error("Error:", err);
          navigate('/success', {
            state: {
              status: 'error',
              message: 'Failed to communicate with backend.',
            },
          });
        });
    } else {
      navigate('/success', {
        state: {
          status: 'error',
          message: 'Missing authorization code or state.',
        },
      });
    }
  }, []);

  return <p>Processing Twitter callback...</p>;
};

export default TwitterCallback;
