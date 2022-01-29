import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import expandableQAndAStyles from "../styles/expandable-q-and-a.module.scss";
import Button from "./button";

export default function ExpandableQAndA({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleFilterOpening = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={expandableQAndAStyles.container}>
      <div
        className={expandableQAndAStyles.header}
        onClick={handleFilterOpening}
      >
        <Button>
          {!isOpen ? (
            <FontAwesomeIcon icon={faChevronDown} />
          ) : (
            <FontAwesomeIcon icon={faChevronUp} />
          )}
        </Button>
        <h1 className="title">{title}</h1>
      </div>

      <div className={expandableQAndAStyles.content}>
        {isOpen && <>{children}</>}
      </div>
    </div>
  );
}
