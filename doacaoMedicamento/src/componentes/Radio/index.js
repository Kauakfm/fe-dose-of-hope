import React from 'react'
import { ClipboardList, Camera, Clock, CheckCircle } from 'lucide-react'
import './style.css'

const steps = [
    { id: 0, icon: ClipboardList, label: 'Preencha o formulário' },
    { id: 1, icon: Camera, label: 'Tire foto do remédio' },
    { id: 2, icon: Clock, label: 'Aguarde aprovação' },
    { id: 3, icon: CheckCircle, label: 'Remédio aprovado' },
]

export default function Radio({ currentStep }) {
    const progress = (currentStep / (steps.length - 1)) * 100


    return (
        <div className="donation-progress">
            <div className="iconsRanges">
                {steps.map((step, index) => (
                    <div key={step.id} className={`iconRange ${index <= currentStep ? 'active-range' : ''}`}>
                        <step.icon />
                        <span>{step.label}</span>
                    </div>
                ))}
            </div>
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    )
}