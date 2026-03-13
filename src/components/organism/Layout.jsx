import Nav from './nav'
import Footer from './Footer'

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen w-full bg-[#111111]">
        <Nav />
        <main className="max-w-7xl mx-auto px-6 py-8">
            {children}
        </main>
        <Footer />
        </div>
    )
}

export default Layout