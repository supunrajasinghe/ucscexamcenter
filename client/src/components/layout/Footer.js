import React from "react";

export default () => {
  return (
    <div
      style={{
        marginTop: "150px",
        position: "fixed",
        bottom: 0,
        width: "100%",
        height: "45px"
      }}
    >
      <footer className="footer bg-dark text-white p-3 text-center">
        Copyright &copy; {new Date().getFullYear()} ucscexamcenter
      </footer>
    </div>
  );
};
