
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-infernal-black">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Heading with pentagram background */}
            <div className="relative mb-12 text-center">
              <div className="absolute inset-0 pentagram-bg opacity-20 animate-slow-spin"></div>
              <h1 className="font-demonic text-4xl md:text-5xl lg:text-6xl text-white relative z-10">
                <span className="text-infernal-crimson">About</span> The Forbidden Archives
              </h1>
            </div>
            
            {/* About SkyAnime Section */}
            <section className="mb-16">
              <div className="bg-infernal-darkest p-6 border border-infernal-crimson/20 rounded-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 pentagram-bg opacity-10"></div>
                
                <h2 className="font-ritual text-2xl md:text-3xl text-white mb-4">The Dark Genesis</h2>
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-white/80 font-gothic">
                    SkyAnime was born from the shadows, forged in flame and darkness. This sacred archive houses the most forbidden manga collections, those stories too dark, too profound, or too haunting for the ordinary reader.
                  </p>
                  
                  <p className="text-white/80 font-gothic mt-4">
                    Our mission is to preserve and provide access to the most elusive and enigmatic works of manga artistry, especially those that delve into the darker aspects of existence. Whether you seek horror, tragedy, or tales of forbidden knowledge, our archives stand ready to serve the brave souls willing to peer beyond the veil of the mundane.
                  </p>
                  
                  <p className="text-white/80 font-gothic mt-4">
                    <span className="text-infernal-crimson font-ritual">Warning:</span> Once you enter these archives, you may find it difficult to return to ordinary stories. The darkness has a way of following those who glimpse its depths.
                  </p>
                </div>
              </div>
            </section>
            
            {/* About Creator Section */}
            <section className="mb-16">
              <div className="bg-infernal-darkest p-6 border border-infernal-crimson/20 rounded-md relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-24 h-24 pentagram-bg opacity-10"></div>
                
                <h2 className="font-ritual text-2xl md:text-3xl text-white mb-6">The Creator</h2>
                
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  {/* Creator image */}
                  <div className="w-40 h-40 relative flex-shrink-0">
                    <div className="absolute inset-0 pentagram-bg opacity-20 animate-slow-spin"></div>
                    <div className="w-full h-full bg-infernal-purple rounded-full overflow-hidden border-2 border-infernal-crimson/30 flex items-center justify-center">
                      <span className="font-demonic text-4xl text-infernal-crimson">R</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-ritual text-xl text-infernal-crimson mb-2">Rishab</h3>
                    <p className="text-white/80 font-gothic mb-4">
                      The mastermind behind SkyAnime, Rishab is a devotee of the darker arts of manga and storytelling. With a passion for the macabre and a keen eye for design, he has created this sanctuary for those seeking stories that mainstream platforms dare not host.
                    </p>
                    
                    <div className="flex flex-wrap gap-3 mt-6">
                      <a href="https://github.com/rishab" target="_blank" rel="noopener noreferrer" className="social-link">
                        <Github size={20} />
                        <span>GitHub</span>
                      </a>
                      
                      <a href="https://twitter.com/rishab" target="_blank" rel="noopener noreferrer" className="social-link">
                        <Twitter size={20} />
                        <span>Twitter</span>
                      </a>
                      
                      <a href="https://linkedin.com/in/rishab" target="_blank" rel="noopener noreferrer" className="social-link">
                        <Linkedin size={20} />
                        <span>LinkedIn</span>
                      </a>
                      
                      <a href="mailto:rishab@skyanime.com" className="social-link">
                        <Mail size={20} />
                        <span>Email</span>
                      </a>
                      
                      <a href="https://rishab.dev" target="_blank" rel="noopener noreferrer" className="social-link">
                        <ExternalLink size={20} />
                        <span>Portfolio</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Tech Stack Section */}
            <section>
              <div className="bg-infernal-darkest p-6 border border-infernal-crimson/20 rounded-md">
                <h2 className="font-ritual text-2xl md:text-3xl text-white mb-4">Arcane Technologies</h2>
                
                <p className="text-white/80 font-gothic mb-6">
                  SkyAnime is powered by a blend of modern and ancient technologies, each carefully selected to enhance your journey through the forbidden texts:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-infernal-black/50 border border-infernal-ash/30 rounded-md">
                    <h3 className="font-ritual text-lg text-infernal-crimson mb-2">Frontend Enchantments</h3>
                    <ul className="list-disc list-inside text-white/70 space-y-1">
                      <li>React & Vite (The binding framework)</li>
                      <li>Tailwind CSS (The arcane styling)</li>
                      <li>Framer Motion (The animation spirits)</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-infernal-black/50 border border-infernal-ash/30 rounded-md">
                    <h3 className="font-ritual text-lg text-infernal-crimson mb-2">Backend Rituals</h3>
                    <ul className="list-disc list-inside text-white/70 space-y-1">
                      <li>Kitsu API (The knowledge retriever)</li>
                      <li>MangaDex API (The chapter collector)</li>
                      <li>CORS Proxy (The barrier breaker)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
