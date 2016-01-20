import DataProvider from "./data-provider";
import sc from "soundcloud";
import creds from "../sc/creds";

sc.initialize({ client_id: creds.Id });

let context = new (window.AudioContext || window.webkitAudioContext)();

function getAnalyser(audioPlayer) {
    audioPlayer.crossOrigin = "anonymous";
    let audioSrc = context.createMediaElementSource(audioPlayer);
    let gainNode = context.createGain();
    let analyser = context.createAnalyser();
    audioSrc.connect(gainNode);
    gainNode.connect(analyser);
    analyser.connect(context.destination);
    // gainNode.gain.value = 0;
    return {gainNode, analyser};
}

export default class SoundCloudSource {
    setup(audioPlayer) {
        this.audioPlayer = audioPlayer;
    }

    track(url) {
        sc.resolve(url).then(result => {
            this.audioPlayer.setAttribute("src", result.stream_url + "?client_id=" + creds.Id);
            let nodes = getAnalyser(this.audioPlayer);
            this.gainNode = nodes.gainNode;
            this.dataProviderSource = new DataProvider(nodes.analyser);
        });
    }

    dataProvider() {
        return this.dataProviderSource || {
            frequency: () => [],
            time: () => []
        };
    }
}
