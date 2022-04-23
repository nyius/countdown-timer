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

		setAlert({
			message: '',
			code: '',
		});

		if (!newTimer.days && !newTimer.hours && !newTimer.minutes && !newTimer.seconds) {
			setAlert({
				message: 'You need to set a timer for at least 1 second!',
				code: 'error',
			});
			return;
		} else if (!newTimer.label) {
			setAlert({
				message: 'You need to give your timer a name',
				code: 'error',
			});
			return;
		} else {
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
		}
	};

	// timer ---------------------------------------------------------------------------------------------------//
	const countdown = () => {
		const intervalVar = setInterval(() => {
			setTimer(prevState => {
				if (prevState === 0) {
					setAlert({
						message: `Your timer for ${newTimer.label} is up!`,
						code: 'success',
					});
					resetTimer();
					return;
				} else {
					return prevState - 1;
				}
			});
		}, 1000);
		setCountdownTimer(intervalVar);
	};

	const resetTimer = () => {
		clearInterval(countdownTimer);
		setCountdownTimer(null);
		setTimer(0);
	};

	// Convert seconds to d/h/m/s ---------------------------------------------------------------------------------------------------//
	const TimeConvert = () => {
		const secondsToDays = Math.floor(timer / (3600 * 24));
		const secondsToHours = Math.floor((timer % (3600 * 24)) / 3600);
		const secondsToMinutes = Math.floor((timer % 3600) / 60);
		const secondsToSeconds = Math.floor(timer % 60);

		return (
			<div className="bg-base-300 py-5 px-10 rounded-lg gap-5 shadow-lg flex flex-col lg:flex-row justify-between items-center">
				<p className="text-xl lg:text-3xl w-full lg:w-1/2 shrink-0 font-thin tracking-wide text-center mb-2 lg:mb-5 break-all">
					{newTimer.label}
				</p>
				<p className="text-xl lg:text-5xl w-full lg:w-1/2 shrink-0 font-bold tracking-wide text-center">
					{secondsToDays}d : {secondsToHours}hr : {secondsToMinutes}min : {secondsToSeconds}
					sec
				</p>
			</div>
		);
	};

	// Display an error message ---------------------------------------------------------------------------------------------------//
	const DisplayMessage = () => {
		return (
			<>
				{alert.code === 'error' && (
					<p className="bg-error text-xl text-base-300 font-bold w-full py-3 px-10 rounded-lg">
						{alert.message}
					</p>
				)}
				{alert.code === 'success' && (
					<p className="bg-success text-xl text-base-300 font-bold w-full py-3 px-10 rounded-lg">
						{alert.message}
					</p>
				)}
			</>
		);
	};

	//---------------------------------------------------------------------------------------------------//
	return (
		<div className="App flex flex-col h-screen bg-gradient-to-r from-cyan-800 to-blue-800">
			<div className="flex flex-col justify-center h-screen items-center mx-auto w-full p-5 lg:p-28">
				<header className="mb-10">
					<p className="font-black text-4xl lg:text-8xl tracking-widest text-center">TIMR</p>
					<div className="w-full bg-base-100 h-2 lg:h-4 mb-2 lg:mb-4"></div>
					<DisplayMessage />
				</header>

				{/* Timer */}
				<div id="timer" className="w-full max-w-7xl mb-20">
					<TimeConvert />
				</div>

				{/* New timer form */}
				<form onSubmit={onSubmit} className="w-full max-w-7xl">
					<div className="flex flex-col lg:flex-row w-full gap-2 items-center justify-center">
						<div className="form-control w-full lg:w-1/5">
							<label
								htmlFor=""
								className="input-group input-group-horizontal lg:input-group-vertical input-group-sm lg:input-group-lg"
							>
								<span className="w-2/5 lg:w-full">Label</span>
								<input
									type="text"
									id="label"
									defaultValue={label}
									className="input input-sm lg:input-lg w-full bg-base-200"
									placeholder="label"
									onChange={onInputChange}
								/>
							</label>
						</div>
						<div className="form-control w-full lg:w-1/5">
							<label
								htmlFor=""
								className="input-group input-group-horizontal lg:input-group-vertical input-group-sm lg:input-group-lg"
							>
								<span className="w-2/5 lg:w-full">Days</span>
								<input
									type="number"
									id="days"
									min="0"
									defaultValue={days}
									className="input input-sm lg:input-lg w-full bg-base-200"
									placeholder="days"
									onChange={onInputChange}
								/>
							</label>
						</div>
						<div className="form-control w-full lg:w-1/5">
							<label
								htmlFor=""
								className="input-group input-group-horizontal lg:input-group-vertical input-group-sm lg:input-group-lg"
							>
								<span className="w-2/5 lg:w-full">Hours</span>
								<input
									type="number"
									id="hours"
									min="0"
									defaultValue={hours}
									className="input input-sm lg:input-lg w-full bg-base-200"
									placeholder="hours"
									onChange={onInputChange}
								/>
							</label>
						</div>
						<div className="form-control w-full lg:w-1/5">
							<label
								htmlFor=""
								className="input-group input-group-horizontal lg:input-group-vertical input-group-sm lg:input-group-lg"
							>
								<span className="w-2/5 lg:w-full">Minutes</span>
								<input
									type="number"
									id="minutes"
									min="0"
									defaultValue={minutes}
									className="input input-sm lg:input-lg w-full bg-base-200"
									placeholder="minutes"
									onChange={onInputChange}
								/>
							</label>
						</div>
						<div className="form-control w-full lg:w-1/5">
							<label
								htmlFor=""
								className="input-group input-group-horizontal lg:input-group-vertical input-group-sm lg:input-group-lg"
							>
								<span className="w-2/5 lg:w-full">Seconds</span>
								<input
									type="number"
									id="seconds"
									min="0"
									defaultValue={seconds}
									className="input input-sm lg:input-lg w-full bg-base-200"
									placeholder="seconds"
									onChange={onInputChange}
								/>
							</label>
						</div>
					</div>
					<button className="btn w-full btn-success hover:bg-base-300 hover:text-success shadow-lg mt-5">
						Set new timer
					</button>
				</form>
			</div>
			<div className="flex items-center justify-center w-full">
				<div className="footer footer-center p-4 rounded-t-xl bg-transparent w-full max-w-7xl bg-base-300 text-base-content">
					Joseph Scicluna 2022
				</div>
			</div>
		</div>
	);
}

export default App;
