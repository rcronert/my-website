import React from "react"
import Image from "../../components/image"
import HeaderBlock from "../../components/headerBlock"

const Clients = () => {

    return (
        <div id="clients">
            <div className="section-content">
                <HeaderBlock
                    header="References"
                    text1="Here are some of the clients I've worked with"
                />
                <div className="grid" data-scroll data-scroll-speed="1">
                    <div className="row">
                        <div className="box"><Image src="criteo-gris.png" alt="Criteo logo" /></div>
                        <div className="box"><Image src="total-gris.png" alt="Total logo" /></div>
                    </div>
                    <div className="row">
                        <div className="box"><Image src="canal-gris.png" alt="Canal Plus logo" /></div>
                        <div className="box"><Image src="paca-gris.png" alt="Conseil Régional PACA logo" /></div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Clients
