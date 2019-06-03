import React from 'react';
import Tooltip from 'react-bootstrap/es/Tooltip';
import OverlayTrigger from 'react-bootstrap/es/OverlayTrigger';

let tooltip = ({ children, title }) => (
  <OverlayTrigger
    placement="top"
    overlay={<Tooltip id="tooltip">{title}</Tooltip>}
  >
    {children}
  </OverlayTrigger>
);

export default tooltip;
