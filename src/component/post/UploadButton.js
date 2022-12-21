import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { postUploader, postEditer } from '../../lib/apis/postApis';
import { imageUpload } from '../../lib/apis/imageUploadApi';

export default function UploadButton({ fileImage, text, preConvertedImg, mode, postId }) {
	let uploadValidation = false;
	const navigate = useNavigate();
	if (!(fileImage === '' && text === '')) {
		uploadValidation = true;
	}
	console.log(preConvertedImg);
	const handlePostUpload = () => {
		if (preConvertedImg === undefined) {
			if (mode === 'edit') {
				const postContent = {
					post: {
						content: text,
						//"imageurl1, imageurl2" 형식으로
					},
				};
				postEditer(postId, postContent).then((res) => {
					console.log(res);
					navigate(`/postdetail/${res.data.post.id}`, { replace: true });
				});
			}
			if (mode === 'new') {
				if (mode === 'new') {
					const postContent = {
						post: {
							content: text,
						},
					};

					postUploader(postContent).then((res) => {
						console.log(res);
						navigate(`/postdetail/${res.data.post.id}`, { replace: true });
					});
				}
			}
		}
		if (preConvertedImg !== undefined) {
			imageUpload(preConvertedImg).then((res) => {
				if (mode === 'edit') {
					const postContent = {
						post: {
							content: text,
							image: fileImage,
						},
					};
					if (res.data.filename === undefined) {
						delete postContent.post.image;
					}
					postEditer(postId, postContent).then((res) => {
						console.log(res);
						navigate(`/postdetail/${res.data.post.id}`, { replace: true });
					});
				}

				if (mode === 'new') {
					const postContent = {
						post: {
							content: text,
							image: `https://mandarin.api.weniv.co.kr/${res.data.filename}`, //"imageurl1, imageurl2" 형식으로
						},
					};
					if (res.data.filename === undefined) {
						delete postContent.post.image;
					}
					postUploader(postContent).then((res) => {
						console.log(res);
						navigate(`/postdetail/${res.data.post.id}`, { replace: true });
					});
				}
			});
		}
	};
	return (
		<>
			<Button onClick={handlePostUpload} text={'업로드'} active={uploadValidation} />
		</>
	);
}
