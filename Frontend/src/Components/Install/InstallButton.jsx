import React, { useState, useEffect, useContext } from "react";
import "./InstallButton.css"; // ✅ Import CSS
import { StoreContext } from "../../Context/StoreContext";

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const { token } = useContext(StoreContext);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setShowInstallButton(!token);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  // Token change hone par button ki visibility update karna
  useEffect(() => {
    setShowInstallButton(!token); 
  }, [token]);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
          console.log("✅ User accepted the install prompt");
        } else {
          console.log("❌ User dismissed the install prompt");
        }
        setShowInstallButton(false);
      });
    }
  };

  return (
    showInstallButton && (
      <button className="install-button" onClick={handleInstallClick}>
        Install App
      </button>
    )
  );
};

export default InstallButton;
