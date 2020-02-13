import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

class ExamCarousel extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: []
		}
	}

	componentDidMount() {
		fetch("https://svc.rappler.com/p/topstories")
  	.then(res => res.json())
  	.then(
			(result) => {
				this.setState({
					isLoaded: true,
					items: result
				});
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			}
		)
	}

  render() {
		const { error, isLoaded, items } = this.state;
		if(error) {
			return (
        <div className="error-message">
          <FontAwesomeIcon icon={faTimesCircle} />
          Error: {error.message}
        </div>
      );
		} else if (!isLoaded) {
			return (
        <div className="loading-message">
          <FontAwesomeIcon icon={faSpinner} />  
          Loading...
        </div>
      );
    } 
    else {
			return (
				<div className="carousel-container">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<Carousel>
									{
										items.data.map((itemList, i) => {
											return(
												<Carousel.Item key={i}>
													<img 
														className="carousel-image"
														src={itemList.images[0].full}
														alt={`slide number ${i}`}
													/>
													<div className="carousel-shade"></div>
													<Carousel.Caption>
														<h3 className="headline">
															{itemList.title}
														</h3>
														<p className="metadesc">
															{itemList.metadesc}
														</p>
													</Carousel.Caption>
												</Carousel.Item>
											);
										})
									}
								</Carousel>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default ExamCarousel;