import './index.css'
import PlayField from '../../components/playField/PlayField';
//import CardCommon from '../../components/playSteps/_cardCommon/CardCommon';

export default function Main() {
    return(
        <main>
            <div className="container">
                <>
                {/* <h1>Main</h1> */}
                <PlayField/>
                </>
            </div>
        </main>
    );
}