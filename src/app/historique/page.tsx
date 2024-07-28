import Footer from "@/components/Footer";

const videoList = [
  {
    title: 'Video 1',
    content: 'https://www.example.com/video1.mp4',
    date: '2024-07-01',
  },
  {
    title: 'Video 2',
    content: 'https://www.example.com/video2.mp4',
    date: '2024-07-02',
  },
  {
    title: 'Video 2',
    content: 'https://www.example.com/video2.mp4',
    date: '2024-07-02',
  },
  {
    title: 'Video 2',
    content: 'https://www.example.com/video2.mp4',
    date: '2024-07-02',
  },

 
];

export default function Historique() {
  return (
    <div className="bg-yellow-50 font-Grandstander min-h-screen flex flex-col" >
      <div className="text-4xl font-semibold text-white text-center pt-8">
        <span className="text-black">HISTORIQUE DES </span>
        <span className="text-blue-600">VIDEOS</span>
      </div>

      <div className="flex-1 flex p-8">
        {/* Image section */}
        <div className="w-1/3">
          <img
            src="images/login.png" // Remplace ce chemin par le chemin réel de ton image
            alt="Description de l'image"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Liste des vidéos avec marge à gauche */}
        <div className="flex-1 ml-32 space-y-4">
          {videoList.map((video, index) => (
            <div
              key={index}
              className={`flex items-start space-x-4 p-2 transition duration-200 ${
                index === videoList.length - 1 ? '' : 'pb-4'
              }`}
            >
              <video
                controls
                className="w-45 h-35 object-cover rounded-lg"
                src={video.content}
              >
                Your browser does not support the video tag.
              </video> 
              <div className="flex-1 m-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-1">{video.title}</h2>
                <p className="text-gray-600">{video.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
