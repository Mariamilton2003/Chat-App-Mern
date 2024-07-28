import { GoogleLogin } from 'react-google-login';

  const responseGoogleSuccess = async (response) => {
      try {
        const result = await  axios({
          method: 'POST',
          url: `${process.env.server_url}/googlelogin`,
          data: { idToken: response.tokenId }
        });
        console.log(result);

      } catch (error) {
        console.log(error);
      }
  }
  const responseGoogleError = (response) => {
          console.log(response)
  }

export default function App() {
  return (
    <div className="App">
     <GoogleLogin
    clientId="164295162557-es2pjevuepoke6jm110sklmnjfkv39rb.apps.googleusercontent.com"
    buttonText="Login with google"
    onSuccess={responseGoogleSuccess}
    onFailure={responseGoogleError}
    cookiePolicy={'single_host_origin'}
  />
    </div>
  );
}
