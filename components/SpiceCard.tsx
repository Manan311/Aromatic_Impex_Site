import Image from "next/image";

interface SpiceCardProps {
  name: string;
  image: string;
}

export default function SpiceCard({ name, image }: SpiceCardProps) {
  return (
    <div className="group text-center p-6 bg-white/70 backdrop-blur-sm rounded-3xl hover:bg-white transition-all duration-500 cursor-pointer border border-slate-200/50 hover:border-amber-300 hover:shadow-2xl hover:shadow-amber-100/50 hover:scale-105">
      <div className="relative">
        <div className="w-24 h-24 rounded-full mx-auto mb-6 overflow-hidden border-4 border-gradient-to-r from-amber-300 to-yellow-400 group-hover:border-amber-400 transition-all duration-300">
          <Image 
            src={image} 
            alt={name} 
            width={96} 
            height={96} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-xs">✨</span>
        </div>
      </div>
      <h4 className="text-slate-700 font-bold text-lg group-hover:text-amber-600 transition-colors">{name}</h4>
    </div>
  );
}
