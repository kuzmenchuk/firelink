import React from 'react';

function Links(props) {
  return (
    <div id="CardLinks">
      <ul>
        {props.data.map(data => (
          <li key={data.id}>
            <a href={data.href} target="_blank" rel="noopener noreferrer">
              <div>
                {data.header}
                <span>{data.subheader}</span>
              </div>
            </a>
          </li>
        ))}

      </ul>
    </div>
  )
}

export default Links;