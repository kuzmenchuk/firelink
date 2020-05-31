import React from 'react';

function Products(props) {
  if (!props.data) return null
  return (
    <div id="Shop">
      <div id="products">
        <ul>
          {props.data.map(data => {
            return (
              <li key={data.id}>
                <a href={data.href} rel="noopener noreferrer" target="_blank">
                  <div className="product__image_outter">
                    {
                      data.imageUrl ? (
                        <div className="product__image_inner">
                          <img src={data.imageUrl} alt={data.header} />
                        </div>
                      ) :
                        <div style={{ width: '100%', height: '100%', color: '#fafafa' }}></div>
                    }

                  </div>

                  <div className="product__text">
                    <span className="product__text_header">
                      {data.header}
                    </span>

                    <span className="product__text_subheader">
                      {data.subheader}
                    </span>
                  </div>

                </a>
              </li>
            )
          })}

        </ul>
      </div>
    </div>
  )
}

export default Products;

