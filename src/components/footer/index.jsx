import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <span>
        Copyright &copy; {`${new Date().getFullYear()}`} All rights reserved.
      </span>
      <div>
        <a className="text-gray" href="/#" onClick={(e) => e.preventDefault()}>
          Term & Conditions
        </a>
        <span className="mx-2 text-muted"> | </span>
        <a className="text-gray" href="/#" onClick={(e) => e.preventDefault()}>
          Privacy & Policy
        </a>
      </div>
    </footer>
  );
}
