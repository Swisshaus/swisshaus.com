import Link from "next/link";
import Image from "next/image";

export function StaticHeroSection() {
  return (
    <section className="p-5">
      <div className="max-w-[1200px] mx-auto">
        <div className="relative w-full h-[50vh] mb-8">
          <Link href="/posts/pr7">
            <div className="relative w-full h-full">
              <Image
                src="/assets/blog/pr7/Finish/webp_converted/PWN00747.webp"
                alt="Completed Custom Home in Porter Ranch Reserve"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 flex items-end">
                <div className="w-full px-5 pb-12">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl">
                    Porter Ranch 7
                  </h1>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto px-5 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight ">
          <hr className="border-gray-500 dark:border-gray-700 my-3" />
            <Link href="/posts/pr7" className="hover:underline">
              {/* <span className="h-1 w-full bg-black block"></span> */}
            </Link>
          </h3>
        </div>
        <div>
          <div className="text-lg leading-relaxed mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><b>Address:</b> <a href="https://www.google.com/maps/place/Porter+Rnch+Rd,+Montana+59901/@48.117061,-114.2034646,827m/data=!3m2!1e3!4b1!4m6!3m5!1s0x536652ff4fda7c9f:0x861adbabb2e9e8fc!8m2!3d48.117061!4d-114.2008843!16s%2Fg%2F11w3y0d55v?entry=ttu&g_ep=EgoyMDI1MDQyOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">164 Porter Ranch Rd., Kalispell MT 59901</a></p>
              <p><b>Square Footage:</b> 3,489 ft²</p>
              <p><b>Bedrooms:</b> 4</p>
            </div>
            <div>
              <p><b>Property Size:</b> 5 acres</p>
              <p><b>Bathrooms:</b> 3.5</p>
              <p><b>Garage Spaces:</b> 3</p>
            </div>
          </div>
          <Link
            href="/posts/pr7"
            className="inline-block px-6 py-3 bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
          >
            View Completed Project
          </Link>
        </div>
      </div>
    </section>
  );
}