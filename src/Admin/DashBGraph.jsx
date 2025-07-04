export function forGraph(graps) {
   
    const gradeLevel = [
        {
            numberOfToTalStudentInGrade:
            graps && (graps.filter((value)=> value.gradeLevel === "12").length ?
                    graps.filter((value)=> value.gradeLevel === "12").length
                    : 
                    false),
            numberWhoComplete:
            graps && (graps.filter((value)=> value.gradeLevel === "12").length ?
                    graps.filter((value)=> value.gradeLevel === "12" && value.statusComp === "complete").length
                    : 
                    false),
            percentOFCOmplete:
            graps && (graps.filter((value)=> value.gradeLevel === "12").length ?
            Math.round(graps.filter((value)=> value.gradeLevel === "12" && value.statusComp === "complete").length / graps.filter((value)=> value.gradeLevel === "12").length * 100) +'%'
                    : 
                    '0%'),
            numberWhoInComplete:
            graps && (graps.filter((value)=> value.gradeLevel === "12").length ?
                    graps.filter((value)=> value.gradeLevel === "12" && value.statusComp === "incomplete").length
                    : 
                    false),
            percentOFInCOmplete:
            graps && (graps.filter((value)=> value.gradeLevel === "12").length ?
            Math.round(graps.filter((value)=> value.gradeLevel === "12" && value.statusComp === "incomplete").length / graps.filter((value)=> value.gradeLevel === "12").length * 100) +'%'
            : 
            '0%'),  
        },
        {
            numberOfToTalStudentInGrade:
            graps && (graps.filter((value)=> value.gradeLevel === "11").length ?
                    graps.filter((value)=> value.gradeLevel === "11").length
                    : 
                    false),
            numberWhoComplete:
            graps && (graps.filter((value)=> value.gradeLevel === "11").length ?
                    graps.filter((value)=> value.gradeLevel === "11" && value.statusComp === "complete").length
                    : 
                    false),
            percentOFCOmplete:
            graps && (graps.filter((value)=> value.gradeLevel === "11").length ?
            Math.round(graps.filter((value)=> value.gradeLevel === "11" && value.statusComp === "complete").length / graps.filter((value)=> value.gradeLevel === "11").length * 100) +'%'
                    : 
                    '0%'),
            numberWhoInComplete:
            graps && (graps.filter((value)=> value.gradeLevel === "11").length ?
                    graps.filter((value)=> value.gradeLevel === "11" && value.statusComp === "incomplete").length
                    : 
                    false),
            percentOFInCOmplete:
            graps && (graps.filter((value)=> value.gradeLevel === "11").length ?
            Math.round(graps.filter((value)=> value.gradeLevel === "11" && value.statusComp === "incomplete").length / graps.filter((value)=> value.gradeLevel === "11").length * 100) +'%'
            : 
            '0%'),  
        },
        {
            numberOfToTalStudentInGrade:
            graps && (graps.filter((value)=> value.gradeLevel === "10").length ?
                    graps.filter((value)=> value.gradeLevel === "10").length
                    : 
                    false),
            numberWhoComplete:
            graps && (graps.filter((value)=> value.gradeLevel === "10").length ?
                    graps.filter((value)=> value.gradeLevel === "10" && value.statusComp === "complete").length
                    : 
                    false),
            percentOFCOmplete:
            graps && (graps.filter((value)=> value.gradeLevel === "10").length ?
            Math.round(graps.filter((value)=> value.gradeLevel === "10" && value.statusComp === "complete").length / graps.filter((value)=> value.gradeLevel === "10").length * 100) +'%'
                    : 
                    '0%'),
            numberWhoInComplete:
            graps && (graps.filter((value)=> value.gradeLevel === "10").length ?
                    graps.filter((value)=> value.gradeLevel === "10" && value.statusComp === "incomplete").length
                    : 
                    false),
            percentOFInCOmplete:
            graps && (graps.filter((value)=> value.gradeLevel === "10").length ?
            Math.round(graps.filter((value)=> value.gradeLevel === "10" && value.statusComp === "incomplete").length / graps.filter((value)=> value.gradeLevel === "10").length * 100) +'%'
            : 
            '0%'),  
        },
        {
            numberOfToTalStudentInGrade:
            graps && (graps.filter((value)=> value.gradeLevel === "9").length ?
                    graps.filter((value)=> value.gradeLevel === "9").length
                    : 
                    false),
            numberWhoComplete:
            graps && (graps.filter((value)=> value.gradeLevel === "9").length ?
                    graps.filter((value)=> value.gradeLevel === "9" && value.statusComp === "complete").length
                    : 
                    false),
            percentOFCOmplete:
            graps && (graps.filter((value)=> value.gradeLevel === "9").length ?
            Math.round(graps.filter((value)=> value.gradeLevel === "9" && value.statusComp === "complete").length / graps.filter((value)=> value.gradeLevel === "9").length * 100) +'%'
                    : 
                    '0%'),
            numberWhoInComplete:
            graps && (graps.filter((value)=> value.gradeLevel === "9").length ?
                    graps.filter((value)=> value.gradeLevel === "9" && value.statusComp === "incomplete").length
                    : 
                    false),
            percentOFInCOmplete:
            graps && (graps.filter((value)=> value.gradeLevel === "9").length ?
            Math.round(graps.filter((value)=> value.gradeLevel === "9" && value.statusComp === "incomplete").length / graps.filter((value)=> value.gradeLevel === "9").length * 100) +'%'
            : 
            '0%'),  
        },
        {
            numberOfToTalStudentInGrade:
            graps && (graps.filter((value)=> value.gradeLevel === "8").length ?
                    graps.filter((value)=> value.gradeLevel === "8").length
                    : 
                    false),
            numberWhoComplete:
            graps && (graps.filter((value)=> value.gradeLevel === "8").length ?
                    graps.filter((value)=> value.gradeLevel === "8" && value.statusComp === "complete").length
                    : 
                    false),
            percentOFCOmplete:
            graps && (graps.filter((value)=> value.gradeLevel === "8").length ?
            Math.round(graps.filter((value)=> value.gradeLevel === "8" && value.statusComp === "complete").length / graps.filter((value)=> value.gradeLevel === "8").length * 100) +'%'
                    : 
                    '0%'),
            numberWhoInComplete:
            graps && (graps.filter((value)=> value.gradeLevel === "8").length ?
                    graps.filter((value)=> value.gradeLevel === "8" && value.statusComp === "incomplete").length
                    : 
                    false),
            percentOFInCOmplete:
            graps && (graps.filter((value)=> value.gradeLevel === "8").length ?
            Math.round(graps.filter((value)=> value.gradeLevel === "8" && value.statusComp === "incomplete").length / graps.filter((value)=> value.gradeLevel === "8").length * 100) +'%'
            : 
            '0%'),  
        },{
        numberOfToTalStudentInGrade:
        graps && (graps.filter((value)=> value.gradeLevel === "7").length ?
                graps.filter((value)=> value.gradeLevel === "7").length
                : 
                false),
        numberWhoComplete:
        graps && (graps.filter((value)=> value.gradeLevel === "7").length ?
                graps.filter((value)=> value.gradeLevel === "7" && value.statusComp === "complete").length
                : 
                false),
        percentOFCOmplete:
        graps && (graps.filter((value)=> value.gradeLevel === "7").length ?
        Math.round(graps.filter((value)=> value.gradeLevel === "7" && value.statusComp === "complete").length / graps.filter((value)=> value.gradeLevel === "7").length * 100) +'%'
                : 
                '0%'),
        numberWhoInComplete:
        graps && (graps.filter((value)=> value.gradeLevel === "7").length ?
                graps.filter((value)=> value.gradeLevel === "7" && value.statusComp === "incomplete").length
                : 
                false),
        percentOFInCOmplete:
        graps && (graps.filter((value)=> value.gradeLevel === "7").length ?
        Math.round(graps.filter((value)=> value.gradeLevel === "7" && value.statusComp === "incomplete").length / graps.filter((value)=> value.gradeLevel === "7").length * 100) +'%'
        : 
        '0%'),  
    },
    

]
   return gradeLevel
}
  
    
