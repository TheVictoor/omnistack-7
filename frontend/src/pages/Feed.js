import React, { Component } from "react";
import api from "../services/api";
import socketIOClient from "socket.io-client";
import comment from "../assets/comment.svg";
import like from "../assets/like.svg";
import more from '../assets/more.svg';
import send from "../assets/send.svg";
import "./Feed.css";

class Feed extends Component {

	constructor() {
		super();
		this.state = {
			feed: []
		};
	}

	componentDidMount = async function () {
		this.registerToSocket();
		const response = await api.get("posts");
		this.setState({ feed: response.data });
	};

	registerToSocket = (() => {

		let _this = this;

		return function () {
			const socket = socketIOClient(process.env.REACT_APP_API_HOST);

			socket.on("post", newPost => {
				_this.setState({ feed: [newPost, ..._this.state.feed] });
			});

			socket.on("like", likedPost =>
				_this.setState({
					feed: _this.state.feed.map(post => post._id === likedPost._id ? likedPost : post)
				})
			);
		}
	})();

	handleLike = (id) => {
		api.post(`/posts/${id}/like`);
	};

	render() {
		return (
			<section id="post-list">
				{
					this.state.feed.map((post) => {
						return (<article key={post._id} >
							<header>
								<div className="user-info">
									<span> {post.author}</span>
									<span className="place"> {post.place} </span>
								</div>
								<img src={more} alt="Mais" />
							</header>

							<img src={`${process.env.REACT_APP_API_HOST}/files/${post.image}`} alt="" />

							<footer>
								<div className="actions">
									<button type="button" onClick={() => { this.handleLike(post._id) }} >
										<img src={like} alt="" />
									</button>
									<img src={comment} alt="" />
									<img src={send} alt="" />
								</div>

								<strong>{post.likes} Curtidas</strong>

								<p>
									{post.description}
									<span>{post.hashtags}</span>
								</p>

							</footer>

						</article>)
					})
				}
			</section>
		)
	}

}

export default Feed;