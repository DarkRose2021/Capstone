import React from "react";

const Contact = () => {
	return (
		<div>
			<h1>Contact Us</h1>
			<div className="flex">

				
				<div className="calender">
					<div>
						{/* Temp until I actually get the calender working */}
						<table bgcolor="black" cellSpacing="21" cellPadding="21">
							<thead>
								<tr>
									<th>Sun</th>
									<th>Mon</th>
									<th>Tue</th>
									<th>Wed</th>
									<th>Thu</th>
									<th>Fri</th>
									<th>Sat</th>
								</tr>
							</thead>

							<tbody>
								<tr>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td>1</td>
									<td>2</td>
								</tr>
								<tr></tr>
								<tr>
									<td>3</td>
									<td>4</td>
									<td>5</td>
									<td>6</td>
									<td>7</td>
									<td>8</td>
									<td>9</td>
								</tr>
								<tr>
									<td>10</td>
									<td>11</td>
									<td>12</td>
									<td>13</td>
									<td>14</td>
									<td>15</td>
									<td>16</td>
								</tr>
								<tr>
									<td>17</td>
									<td>18</td>
									<td>19</td>
									<td>20</td>
									<td>21</td>
									<td>22</td>
									<td>23</td>
								</tr>
								<tr>
									<td>24</td>
									<td>25</td>
									<td>26</td>
									<td>27</td>
									<td>28</td>
									<td>29</td>
									<td>30</td>
								</tr>
								<tr>
									<td>31</td>
									<td>1</td>
									<td>2</td>
									<td>3</td>
									<td>4</td>
									<td>5</td>
									<td>6</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div className="form">
					<div>
						<h3>Email Us</h3>
						<form>
							<label htmlFor="name">Name:</label>
							<br />
							<input
								id="name"
								name="name"
								placeholder="Name"
								type="text"
								required
							/>
							<br />

							<label htmlFor="email">Email:</label>
							<br />
							<input
								id="email"
								name="email"
								placeholder="Email"
								type="email"
								required
							/>

							<label htmlFor="message">Message:</label>
							<br />
							<textarea
								id="message"
								name="message"
								placeholder="Email body"
								rows="2"
								cols="25"
							></textarea>
							<br />

							<button type="submit">Send Email</button>
						</form>
						<h4>
							Call Me at <a href="tel:3853550184">(385)355-0184</a>
						</h4>
					</div>
				</div>
				</div>
			</div>
	);
};

export default Contact;
