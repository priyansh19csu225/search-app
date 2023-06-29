import React, { useEffect, useRef, useState } from "react";
import API_URL from "../../constants/apiurl";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function PhotoContainer(props) {
  const { picture } = props;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const image = new Image();
    image.src = `${API_URL.SHOW}${picture.server}/${picture.id}_${picture.secret}_n.jpg`;

    image.onload = () => {
      setImageLoaded(true);
    };

    return () => {
      image.onload = null;
    };
  }, [picture]);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <div
        onClick={handleOpenDialog}
        style={{
          width: imageLoaded ? ref.current?.offsetWidth : "400px",
          height: imageLoaded ? ref.current?.offsetHeight : "400px",
          cursor: "pointer",
        }}
      >
        {imageLoaded ? (
          <img
            ref={ref}
            src={`${API_URL.SHOW}${picture.server}/${picture.id}_${picture.secret}_n.jpg`}
            alt={picture?.title}
            onLoad={() => setImageLoaded(true)}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.1)",
              filter: "blur(8px)",
            }}
          />
        )}
      </div>

      {dialogOpen && (
        <Dialog fullWidth open={dialogOpen} onClose={handleCloseDialog}>
          <center>
            <DialogTitle>
              {picture?.title || "Picture"}
              <IconButton
                aria-label="close"
                onClick={handleCloseDialog}
                sx={{
                  position: "absolute",
                  right: 12,
                  top: 14,
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <img
                src={`${API_URL.SHOW}${picture.server}/${picture.id}_${picture.secret}_n.jpg`}
                alt={picture?.title}
                style={{
                  width: ref.current?.offsetWidth,
                  height: ref.current?.offsetHeight,
                }}
              />
            </DialogContent>
          </center>
        </Dialog>
      )}
    </div>
  );
}

export default PhotoContainer;
