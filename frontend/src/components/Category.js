import React from 'react';
import '../styles/Category.css'

function Category(props) {

    const categories_list = ['Art', 'Career', 'Economics', 'Entertainment', 'Financial', 'Mental Health', 'Other',
        'Personal Health', 'Science', 'Social issues', 'Sports']

    return <div className="category-bg">
        <select className="category-input" id="category" style={{paddingTop: "10px"}}
                onChange={props.onChange} required={true}
        >
            <option value="">Article category</option>
            {categories_list.map(val => <option value={val} key={val}>{val}</option>)}
        </select>
    </div>;
}

export default Category;