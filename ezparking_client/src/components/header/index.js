import logo from '../../assert/logo.png';

function PageHeader() {
    return ( 
    
    <div className='inline-flex mx-auto my-3'>  
        <img className='h-10' src={logo} alt="Logo" />
        <div className=" ml-5 text-4xl ">
            EzParking
        </div>
    </div> );
}

export default PageHeader;