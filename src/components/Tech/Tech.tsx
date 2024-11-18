import { useContext, useEffect, useState } from "react";
import { Context } from "../options/Context";
import Option from "../options/Option";
import "./tech.css";

function Spec() {
	const context = useContext(Context);

	if (!context) {
		return <div>Error: Context is not available!</div>;
	}

	const {
		count,
		setCount,
		concentrationCount,
		setConcentrationCount,
		concentrationCost,
		setConcentrationCost,
		concentrationIncrement,
		gif,
		setGif,
		setAttackMultiplier,
		ennemyLife,
		setEnnemyLife,
		ennemyList,
		ennemyIndex,
		setEnnemyIndex,
	} = context;

	const [style, setStyle] = useState("spec-option");
	const [saiyenState, setSaiyenState] = useState(0);
	const [kamehamehaStyle, setKamehamehaStyle] = useState("kamehameha");
	const kamehamehaCost = 40;

	useEffect(() => {
		setStyle(
			count >= concentrationCost ? "spec-option-available" : "spec-option",
		);
		setKamehamehaStyle(count >= 40 ? "kamehameha-available" : "kamehameha");
	}, [count, concentrationCost]);

	const handleClickKi = () => {
		if (count >= concentrationCost) {
			setCount(count - concentrationCost);
			setConcentrationCount(concentrationCount + 1);
			setConcentrationCost(concentrationCost + 5);
		}
	};

	const handleClickKamehameha = () => {
		if (count >= kamehamehaCost) {
			setCount(count - kamehamehaCost);
			const damage = 50;
			if (ennemyLife > damage) {
				setEnnemyLife(Math.max(ennemyLife - damage, 0));
			} else {
				alert(`Tu as battu ${ennemyList[ennemyIndex].name} !`);
				setEnnemyIndex((ennemyIndex + 1) % ennemyList.length);
			}
		}
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setCount(
				(prevCount: number) =>
					prevCount + concentrationCount * concentrationIncrement,
			);
		}, 1000);

		return () => clearInterval(interval);
	}, [concentrationCount, concentrationIncrement, setCount]);

	const handleClickSsj = () => {
		if (count >= 50 && gif !== 1) {
			setGif(1);

			setTimeout(() => {
				setGif(2);
			}, 10500);

			setCount(count - 50);
		}
		setSaiyenState(1);
		setAttackMultiplier(5);
	};

	const handleClickSsj2 = () => {
		if (count >= 100 && gif !== 3) {
			setGif(3);

			setTimeout(() => {
				setGif(4);
			}, 3000);

			setCount(count - 100);
		}
		setSaiyenState(2);
		setAttackMultiplier(10);
	};

	return (
		<div className="spec-container">
			<ul>
				<Option
					label="Concentration du KI"
					isAvailable={count >= concentrationCost}
					onClick={handleClickKi}
					className={style}
				/>

				<Option
					label="Kamehameha"
					isAvailable={count >= 40}
					onClick={handleClickKamehameha}
					className={kamehamehaStyle}
				/>

				{count >= 50 && saiyenState === 0 && (
					<Option
						label="Super Saiyen"
						isAvailable={count >= 50}
						onClick={handleClickSsj}
						className="saiyan-option"
					/>
				)}
				{count >= 100 && saiyenState === 1 && (
					<Option
						label="Super Saiyen 2"
						isAvailable={count >= 50}
						onClick={handleClickSsj2}
						className="saiyan-option"
					/>
				)}
			</ul>
		</div>
	);
}

export default Spec;