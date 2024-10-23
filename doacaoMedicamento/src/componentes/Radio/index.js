// import React from 'react'
// import { ClipboardList, Camera, Clock, CheckCircle } from 'lucide-react'
// import './style.css'

// const steps = [
//     { id: 0, icon: ClipboardList, label: 'Preencha o formulário' },
//     { id: 1, icon: Camera, label: 'Tire foto do remédio' },
//     { id: 2, icon: Clock, label: 'Aguarde aprovação' },
//     { id: 3, icon: CheckCircle, label: 'Remédio aprovado' },
// ]

// export default function Radio({ currentStep }) {
//     const progress = (currentStep / (steps.length - 1)) * 100


//     return (
//         <div className="donation-progress">
//             <div className="iconsRanges">
//                 {steps.map((step, index) => (
//                     <div key={step.id} className={`iconRange ${index <= currentStep ? 'active-range' : ''}`}>
//                         <step.icon />
//                         <span>{step.label}</span>
//                     </div>
//                 ))}
//             </div>
//             <div className="progress-bar-container">
//                 <div className="progress-bar" style={{ width: `${progress}%` }}></div>
//             </div>
//         </div>
//     )
// }
import React from 'react';
import { ClipboardList, Camera, Clock, CheckCircle, CircleX } from 'lucide-react';
import './style.css';

export default function Radio({ currentStep }) {
    const steps = [
        { id: 0, icon: ClipboardList, label: 'Preencha o formulário', isVisible: true },
        { id: 1, icon: Camera, label: 'Tire foto do remédio', isVisible: true },
        { id: 2, icon: Clock, label: 'Aguarde aprovação', isVisible: true },
        { id: 3, icon: CheckCircle, label: 'Remédio aprovado', isVisible: currentStep === 4 ? false : true },
        { id: 4, icon: CircleX, label: 'Remédio reprovado', isVisible: currentStep === 4 }
    ];

    const progress = (currentStep / (steps.length - 1)) * 150;

    return (
        <div className="donation-progress">
            <div className="iconsRanges">
                {steps.map((step, index) => (
                    <div key={step.id} className={`iconRange ${index <= currentStep ? 'active-range' : ''}`}>
                        {step.isVisible && <step.icon />}
                        {step.isVisible && <span>{step.label}</span>}
                    </div>
                ))}
            </div>
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    );
}
