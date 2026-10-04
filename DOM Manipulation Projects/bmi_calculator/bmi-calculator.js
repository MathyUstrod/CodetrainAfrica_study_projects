//BMI Calculator
//read input
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const outputBMI = document.getElementById('bmi');

//bmi calculation fxn
function calculateBMI(ht, wt){
    let calcBMI = 0;
    if(ht == 0 || wt == 0){
        return calcBMI;
    } else {
        htMeters = ht/100;
        calcBMI = wt / Math.pow(htMeters, 2 )
        calcBMI = Math.round(calcBMI*10)/10;
        return calcBMI;
    }
}

//fxn to get the values and update UI
function updateUI(){
    let fBMI = calculateBMI(height.value, weight.value);
    outputBMI.textContent = fBMI;

    if(fBMI < 18.5){
        outputBMI.classList.remove('text-cyan-800', 'text-green-800', 'bg-green-400/60', 'text-orange-800', 'bg-orange-400/60', 'text-red-800', 'bg-red-400/60');
        outputBMI.classList.add('text-amber-800', 'bg-amber-400/40');
    }

    if(fBMI >= 18.5 && fBMI < 25){
        outputBMI.classList.remove('text-cyan-800', 'text-amber-800', 'bg-amber-400/40', 'text-orange-800', 'bg-orange-400/60', 'text-red-800', 'bg-red-400/60');
        outputBMI.classList.add('text-green-800', 'bg-green-400/60');
    }

    if(fBMI >= 25 && fBMI < 30){
        outputBMI.classList.remove('text-cyan-800', 'text-green-800', 'bg-green-400/60', 'text-amber-800', 'bg-amber-400/40', 'text-red-800', 'bg-red-400/60');
        outputBMI.classList.add('text-orange-800', 'bg-orange-400/60');
    }

    if(fBMI >= 30){
        outputBMI.classList.remove('text-cyan-800', 'text-green-800', 'bg-green-400/60', 'text-orange-800', 'bg-orange-400/60', 'text-amber-800', 'bg-amber-400/40');
        outputBMI.classList.add('text-red-800', 'bg-red-400/60');
    }
    
}

