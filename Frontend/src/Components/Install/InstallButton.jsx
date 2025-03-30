import React, { useState, useEffect, useContext } from "react";
import "./InstallButton.css"; // ✅ Import CSS

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);

      const token = localStorage.getItem("token");
      if (!token) {
        setShowInstallButton(true);
      }
      // setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

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
