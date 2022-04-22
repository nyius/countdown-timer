import { useState, useEffect } from 'react';

function App() {
	const [alert, setAlert] = useState({
		message: '',
		code: '',
	});
	const [timer, setTimer] = useState(0);
	const [newTimer, setNewTimer] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
		label: '',
	});

	const [countdownTimer, setCountdownTimer] = useState(null);

	const { days, hours, minutes, label, seconds } = newTimer;

	// entering new timer settings ---------------------------------------------------------------------------------------------------//
	const onInputChange = e => {
		if (e.target.id === 'label') {
			setNewTimer(prevState => ({
				...prevState,
				label: e.target.value,
			}));
		} else {
			setNewTimer(prevState => ({
				...prevState,
				[e.target.id]: Number(e.target.value),
			}));
		}
	};

	// new timer submit ---------------------------------------------------------------------------------------------------//
	const onSubmit = async e => {
		e.preventDefault();

		if (!newTimer.days && !newTimer.hours && !newTimer.minutes && !newTimer.seconds) {
			setAlert({
				message: 'You need to set a timer for at least 1 second!',
				code: 'error',
			});
			return;
		}

		clearInterval(countdownTimer);
		setCountdownTimer(null);

		const daysToSeconds = newTimer.days * 24 * 60 * 60;
		const hoursToSeconds = newTimer.hours * 60 * 60;
		const minutesToSeconds = newTimer.minutes * 60;

		const timerSeconds = daysToSeconds + hoursToSeconds + minutesToSeconds + newTimer.seconds;

		setTimer(timerSeconds);

		countdown();
		setAlert({
			message: 'Timer set!',
			code: 'success',
		});
	};

	// timer ---------------------------------------------------------------------------------------------------//
	const countdown = () => {
		const intervalVar = setInterval(() => {
			setTimer(prevState => prevState - 1);
		}, 1000);
		setCountdownTimer(intervalVar);
	};

	// Convert seconds to d/h/m/s ---------------------------------------------------------------------------------------------------//
	const TimeConvert = () => {
		const secondsToDays = Math.floor(timer / (3600 * 24));
		const secondsToHours = Math.floor((timer % (3600 * 24)) / 3600);
		const secondsToMinutes = Math.floor((timer % 3600) / 60);
		const secondsToSeconds = Math.floor(timer % 60);

		return (
			<div className="bg-base-300 w-full py-5 px-10 rounded-lg shadow-lg flex flex row justify-between items-center">
				<p className="text-3xl font-thin  tracking-wide text-center mb-5">{newTimer.label}</p>
				<p className="text-5xl font-bold tracking-wide text-center">
					{secondsToDays}d : {secondsToHours}hr : {secondsToMinutes}min : {secondsToSeconds}
					sec
				</p>
			</div>
		);
	};

	// Display an error message ---------------------------------------------------------------------------------------------------//
	const DisplayMessage = () => {
		setTimeout(() => {
			setAlert({
				message: '',
				code: '',
			});
		}, 5000);

		return (
			<>
				{alert.code === 'error' && (
					<p className="bg-error text-xl text-base-300 font-bold w-full py-3 px-10 rounded-lg">
						{alert.message}
					</p>
				)}
				{alert.code === 'success' && <p className="bg-success text-xl">{alert.message}</p>}
			</>
		);
	};

	//---------------------------------------------------------------------------------------------------//
	return (
		<div className="App">
			<div className="flex flex-col justify-between items-center mx-auto w-full h-screen p-28">
				<header>
					<DisplayMessage />
				</header>

				{/* Timer */}
				<div id="timer" className="w-3/4">
					<TimeConvert />
				</div>

				{/* New timer form */}
				<form onSubmit={onSubmit}>
					<div className="flex flex-row w-full gap-2 items-center justify-center">
						<div className="form-control">
							<label htmlFor="" className="input-group input-group-vertical input-group-lg">
								<span>Label</span>
								<input
									type="text"
									id="label"
									defaultValue={label}
									className="input input-lg w-full bg-base-200"
									placeholder="label"
									onChange={onInputChange}
								/>
							</label>
						</div>
						<div className="form-control">
							<label htmlFor="" className="input-group input-group-vertical input-group-lg">
								<span>Days</span>
								<input
									type="number"
									id="days"
									min="0"
									defaultValue={days}
									className="input input-lg w-full bg-base-200"
									placeholder="days"
									onChange={onInputChange}
								/>
							</label>
						</div>
						<div className="form-control">
							<label htmlFor="" className="input-group input-group-vertical input-group-lg">
								<span>Hours</span>
								<input
									type="number"
									id="hours"
									min="0"
									defaultValue={hours}
									className="input input-lg w-full bg-base-200"
									placeholder="hours"
									onChange={onInputChange}
								/>
							</label>
						</div>
						<div className="form-control">
							<label htmlFor="" className="input-group input-group-vertical input-group-lg">
								<span>Minutes</span>
								<input
									type="number"
									id="minutes"
									min="0"
									defaultValue={minutes}
									className="input input-lg w-full bg-base-200"
									placeholder="minutes"
									onChange={onInputChange}
								/>
							</label>
						</div>
						<div className="form-control">
							<label htmlFor="" className="input-group input-group-vertical input-group-lg">
								<span>Seconds</span>
								<input
									type="number"
									id="seconds"
									min="0"
									defaultValue={seconds}
									className="input input-lg w-full bg-base-200"
									placeholder="seconds"
									onChange={onInputChange}
								/>
							</label>
						</div>
					</div>
					<button className="btn w-full btn-primary mt-5">Set new timer</button>
				</form>
				<div className="footer mx-auto flex items-center justify-center">Joseph Scicluna 2022</div>
			</div>
		</div>
	);
}

export default App;
