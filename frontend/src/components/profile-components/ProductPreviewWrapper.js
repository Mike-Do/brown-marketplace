import React, { useState, useEffect } from 'react'
import database from "../../backend/Database/DBInstance"
import { ref, onValue }
    from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

import "./wishlist.css"

import ProductPreviewV2 from '../search-result-components/ProductPreviewV2';
import { readOneProductInfo } from '../../backend/Database/ProductDB/readDatabaseV2';

function ProductPreviewWrapper(props) {
    let productId = props.productId;

    const [productInfo, setProductInfo] = useState({
        id: productId,
        name: '',
        description: '',
        price: 0,
        pictures: ''
    })

    useEffect(() => {

        async function fetchProductInfo() {
            const response = await readOneProductInfo(productId ?? "");
            setProductInfo(response);
        }

        fetchProductInfo()
    }, [])

    return (
        <div className="wishlist-items">
            <ProductPreviewV2 productInfo={productInfo} />
        </div>
    )
}

export default ProductPreviewWrapper