import { useState, useRef } from "react";
import "./App.css";
import EnnemyCard from "./components/Card/EnnemyCard";
import Card from "./components/Card/PlayerCard";
import Tech from "./components/Tech/Tech";
import { Provider } from "./components/options/Context";
import Homepage from "./components/Homepage/Homepage";

function App() {
	const [currentLocation, setCurrentLocation] = useState("/");
	const [isMusicPlaying, setIsMusicPlaying] = useState(false);

	const musicList = ["src/assets/music/Gohan-anger.mp3", "src/assets/music/change.mp3"];

	const currentAudioRef = useRef<HTMLAudioElement | null>(null);
	const currentTrackIndex = useRef(0); //stocke une valeur mutable qui ne déclenche pas de rendu lorsqu'elle est modifiée

	const handleStartGame = () => {
		setCurrentLocation("/game")
		playMusic(0);
	};

	const playMusic = (index: number) => {
		if (index >= musicList.length) {
			currentAudioRef.current = null;
			setIsMusicPlaying(false);
			return;
		}

		const music = new Audio(musicList[index]);
		currentAudioRef.current = music;
		currentTrackIndex.current = index;

		music.play();
		setIsMusicPlaying(true);

		music.addEventListener("ended", () => {
			playMusic(index + 1);
		});
	};

	const handleMusic = () => {
		if (isMusicPlaying && currentAudioRef.current) {
			currentAudioRef.current.pause();
			setIsMusicPlaying(false);
		} else if (currentAudioRef.current) {
			currentAudioRef.current.play();
			setIsMusicPlaying(true);
		}
	};

	return (
		<>
			
			{currentLocation === "/" &&	<Homepage handleStartGame={handleStartGame}/>} 
			{currentLocation === "/game" && <Provider>
					<div>
						<button className="musique" type="button" onClick={handleMusic}>
							Musique On/Off
						</button>
					</div>
					<Card />
					<Tech />
					<EnnemyCard />
				</Provider>
			}
		</>
	);
}

export default App;
