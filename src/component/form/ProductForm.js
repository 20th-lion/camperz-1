import React, { useRef } from 'react';
import styled from 'styled-components';

import iconSrc from '../../assets/image/img-upload-icon.svg';

export default function ProductForm({ setProductInfo, productInfo }) {
	const photoInput = useRef();

	const onChange = (e) => {
		const { name, value } = e.target;
		setProductInfo({
			...productInfo,
			[name]: value,
		});
	};

	const handleImgChange = (e) => {
		setProductInfo({
			...productInfo,
			itemImage: URL.createObjectURL(e.target.files[0]),
		});
	};
	return (
		<>
			<div
				style={{
					width: '200px',
					height: '200px',
					backgroundColor: 'gray',
				}}
				onClick={() => {
					photoInput.current.click();
				}}
			>
				<LabelImg />
				<input
					name="image"
					id="image"
					style={{ display: 'none' }}
					ref={photoInput}
					type="file"
					accept="image/*"
					onChange={handleImgChange}
				/>
				<PictureArea src={productInfo.itemImage} alt="상품 이미지" />
			</div>
			<div>
				이름
				<input
					type="text"
					value={productInfo.itemName}
					name="itemName"
					onChange={(e) => onChange(e)}
				/>
			</div>
			<div>
				가격
				<input
					type="number"
					value={productInfo.price}
					name="price"
					onChange={(e) => onChange(e)}
				/>
			</div>
			<div>
				링크
				<input type="text" name="link" value={productInfo.link} onChange={(e) => onChange(e)} />
			</div>
		</>
	);
}

const PictureArea = styled.img`
	width: 200px;
	height: 150px;
	object-fit: cover;
`;

const LabelImg = styled.img`
	width: 50px;
	height: 50px;
	background-image: url(${iconSrc});
	border: 0;
	padding: 0;
	border-radius: 50px;
	pointer-events: 'none';
`;