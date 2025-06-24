import "./MainTitle.css";
import { Link } from "react-router-dom";

export default function MainTitle({ mainTitle, linkToCreate, titleButton }) {
  return (
    <div className="d-flex justify-content-between align-items-center w-100 mb-2">
      <div>
        <h3 className="fs-4 mainTitle">{mainTitle}</h3>
      </div>
      <div className="btnNewContainer rounded py-1 ">
        <Link
          to={linkToCreate}
          className="d-flex px-4 justify-content-between align-items-center"
        >
          <svg
            className="svgSize text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <button className="btnNew border border-0 text-white bg-transparent">
            {titleButton}
          </button>
        </Link>
      </div>
    </div>
  );
}
