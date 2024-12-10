import React from "react";

const ImageCredit = ({
  creditAuthor,
  creditAuthorLink,
  creditPlatformLink,
}) => {
  return (
    creditAuthor && (
      <div className="absolute bottom-0 right-0 p-2 text-sm text-white/70 bg-black/30">
        Photo by{" "}
        {creditAuthorLink ? (
          <a
            href={creditAuthorLink}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {creditAuthor}
          </a>
        ) : (
          creditAuthor
        )}
        {creditPlatformLink ? (
          <>
            {" "}
            on{" "}
            <a
              href={creditPlatformLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Unsplash
            </a>
          </>
        ) : null}
      </div>
    )
  );
};

export default ImageCredit;
