import React from 'react'
import { Fragment } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import ServiceLocationform from './ServiceLocationform';

export default function ServiceLocationAccordion() {
  return (
    <Fragment>
        
        <Accordion defaultActiveKey="0" flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header><span>Location # 1 </span> </Accordion.Header>
              <Accordion.Body>
                 <ServiceLocationform/>
              </Accordion.Body>
          </Accordion.Item>

          {/* <Accordion.Item eventKey="1">
            <Accordion.Header><span>Location # 2 </span> </Accordion.Header>
              <Accordion.Body>
                 <ServiceLocationform/>
              </Accordion.Body>
          </Accordion.Item> */}
{/*         
          <Accordion.Item eventKey="2">
            <Accordion.Header><span>Location # 3 </span> </Accordion.Header>
              <Accordion.Body>
                 <ServiceLocationform/>
              </Accordion.Body>
          </Accordion.Item> */}

        </Accordion>
        


    </Fragment>
  )
}