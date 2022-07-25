import React from 'react';

const CatrgoriesList = ({categories}) => {
    return (
        <div className='col-6'>
            {
                categories.map(category =>{
                    const childList = category.childList && <CatrgoriesList categories={category.childList} />
                    return (
                        <div key={category.id}>
                            <div>{category.name}</div>
                            <div className="d-flex justify-content-start">
                                <div className="col-1"></div>
                                {childList}
                            </div>
                        </div>
                    )
                    }    
                )
            }
        </div>
    );
};

export default CatrgoriesList;