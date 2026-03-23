import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const YoutubeCallback = () => {

  const navigate = useNavigate();

  useEffect(() => {

    const hash = window.location.hash;

    const params = new URLSearchParams(hash.replace("#","?"));

    const token = params.get("access_token");

    if(token){
      localStorage.setItem("youtube_token", token);
      navigate("/dashboard");
    }

  }, [navigate]);   // 👈 ye add karo

  return <h2>Connecting YouTube...</h2>;
};

export default YoutubeCallback;