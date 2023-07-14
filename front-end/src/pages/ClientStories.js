import React from 'react'

const ClientStories = () => {
  // add list of clients wither their images
  return (
    <div>
      <h1>Client Stories</h1>
			{/* eventually put in to something that I can loop over */}
			<div className="album py-5 highlight-color">
				<div className="container">
					<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
							<div className="col">
								<div className="card shadow-sm">
									<img src="" className="card-img-top" alt="..." />
									<div className="card-body">
										<h5 className="card-title">Client Name</h5>
										<p className="card-text">Client text</p>
										
									</div>
								</div>
							</div>
					</div>
				</div>
			</div>
    </div>
  )
}

export default ClientStories