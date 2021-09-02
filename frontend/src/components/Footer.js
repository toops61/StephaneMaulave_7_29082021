import brandLogo from '../assets/9gag_new_logo_small.png';

const Footer = () => {
    return (
        <footer className='footer'>
            <ul className='footer__social'>
                <li>
                    <a href='https://www.facebook.com/' title='facebook' target='_blank' rel='noreferrer' tabIndex='0'>facebook</a>
                </li>
                <li>
                    <a href='https://twitter.com/' title='bandcamp' target='_blank' rel='noreferrer' tabIndex='0'>twitter</a>
                </li>
                <li>
                    <a href='https://www.instagram.com' title='chaine youtube' target='_blank' rel='noreferrer' tabIndex='0'>instagram</a>
                </li>
                <li>
                    <div className='footer__social__9gag'>
                        <img src={brandLogo} alt='9gag' />
                    </div>
                    <a href='https://www.9gag.com' title='9gag' target='_blank' rel='noreferrer' tabIndex='0'>9gag</a>
                </li>
            </ul>
            <div className='footer__mentions-legales'>
                <h2>
                    Mentions légales :
                </h2>
                <p>
                    Ce site est édité par la société  Groupomania.
                    Siège social : 50 rue de St Cyr 69002 Lyon
                    Capital social : 50000 euros
                    Téléphone : +33 (0)4.74.00.00.00

                    Responsable de la rédaction :

                    Développement, hébergement :
                    Ice development – www.ice-dev.com
                    16 rue Maurice Bouchor - 69007 Lyon
                    Tél : 08 21 23 03 54
                    Informatique et liberté

                    Aucune information personnelle n'est collectée à votre insu. Les informations que vous nous communiquez lors d’une demande de devis, de renseignements ou d’inscription à la newsletter par courrier, par téléphone, par e-mail ou par formulaire sont uniquement destinées au traitement administratif et commercial de votre demande par la société Groupomania 

                    Elles ne font l'objet d'aucune cession à des tiers. Groupomania traite les informations qui vous concernent avec la plus grande confidentialité.

                    Conformément à la loi « Informatique et Libertés » n°78-17 du 6 janvier 1978, vous disposez d'un droit d'accès, de rectification et d'opposition aux données personnelles vous concernant. Pour l'exercer, il suffit de nous en faire la demande par écrit aux coordonnées suivantes : Groupomania, 50 rue de St Cyr 69002 Lyon, France.
                    Droit d'auteur / copyright

                    L'ensemble du contenu du présent site Internet, y compris nom de domaine, marques, logo, texte… est la propriété de la société Groupomania, il est protégé par les lois en vigueur de la législation française sur la propriété intellectuelle.

                    Aucun élément de ce site ne peut être copié, reproduit, détourné ou dénaturé, et ce, sur quelque support que ce soit, sans constituer un acte de contrefaçon au sens des articles L 335-2 et suivants du code de la propriété intellectuelle. 
                    Accès au site

                    L'utilisateur de ce site reconnaît disposer de la compétence et des moyens nécessaires pour accéder et utiliser ce site. Groupomania ne saurait être tenu responsable des éléments en dehors de son contrôle et des dommages qui pourraient éventuellement être subis par l'environnement technique de l'utilisateur et notamment, ses ordinateurs, logiciels, équipements réseaux et tout autre matériel utilisé pour accéder ou utiliser le service et/ou les informations.

                    Il est rappelé que le fait d'accéder ou de se maintenir frauduleusement dans un système informatique, d'entraver ou de fausser le fonctionnement d'un tel système, d'introduire ou de modifier frauduleusement des données dans un système informatique constitue des délits passibles de sanctions pénales.
                    Limitation de responsabilité

                    Groupomania s'attache à transmettre des informations régulièrement mises à jour, notamment sur les actualités ainsi que sur le contenu des articles. Toutefois des informations erronées ou des omissions peuvent être constatées, suite notamment à des erreurs de saisie ou de mise en page. Si vous en faisiez le constat nous vous invitons à nous le signaler pour que nous puissions procéder à leur rectification.

                    Nous nous réservons par ailleurs le droit de modifier les informations ou les éventuelles offres commerciales fournies par le présent site, dans le cadre de nos opérations d'actualisation et de mise à jour des données, et ce sans préavis.

                    Les liens hypertextes mis en oeuvre au sein du présent site Internet, en direction d'autres sites et/ou de pages personnelles et d'une manière générale vers toutes ressources existantes sur Internet, ne sauraient engager la responsabilité de Groupomania.
                    De même que la société Groupomania ne pourra en aucune façon être tenue pour responsable des sites ayant un lien hypertexte avec le présent site et décline toute responsabilité quant à leur contenu et à leur utilisation.
                </p>
            </div>
        </footer>
    )
}

export default Footer;