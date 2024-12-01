import Link from "next/link";

const ButtonLogin = ({ extrastyle }: { extrastyle?: string }) => {
  return (
    <button className={`btn btn-primary ${extrastyle ? extrastyle : ""}`}>
      Login
    </button>
  );
};

export default ButtonLogin;
