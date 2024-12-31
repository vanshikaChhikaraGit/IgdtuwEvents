const Layout = ({children} :{children:React.ReactNode})=>{
    return(
        <div className="flex-center bg-primary-50 min-h-screen w-full bg-cover bg-dotted-pattern bg-fixed ">
        {children}
        </div>
    )
}

export default Layout