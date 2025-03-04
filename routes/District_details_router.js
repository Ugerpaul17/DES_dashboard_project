var express = require('express');
var router = express.Router();
var connection = require('../config/database');

/* GET home page. */
router.get('/', function (req, res, next) {

    const districtsQuery = "select distinct(district) as district from tbl_random";

    connection.query(districtsQuery, function (err, result) {

        let allDistricts = [];

        for (let i = 0; i < result.length; i++) {
            let district = result[i].district;
            allDistricts.push(district)
        }

        
        console.log(allDistricts)

        res.render('district', {district: allDistricts});



    });

});

/* GET home page. */
router.get('/:district', function(req, res, next) {

    
    const limit = 10;

    let nameOfDistrict = req.params.district;

    const dQuery =`select distinct(district) as district, count(name_of_school) as Totalschools,
    sum(p1__enrolment__boys)+sum(p1__enrolment__girls)+sum(p2__enrolment__boys)+
    sum(p2__enrolment__girls)+sum(p3__enrolment__boys)+sum(p3__enrolment__girls)+
    sum(p4__enrolment__boys)+sum(p5__enrolment__boys)+sum(p5__enrolment__girls)+
    sum(p6__enrolment__boys)+sum(p6__enrolment__girls)+sum(p7__enrolment__boys)+sum(p7__enrolment__girls) as Total, 
    sum(p1__enrolment__boys)+sum(p2__enrolment__boys)+sum(p3__enrolment__boys)+sum(p4__enrolment__boys)+
    sum(p5__enrolment__boys)+sum(p6__enrolment__boys)+sum(p7__enrolment__boys) as TotalBoys,
    sum(p1__enrolment__girls)+sum(p2__enrolment__girls)+sum(p3__enrolment__girls)+
    sum(p5__enrolment__girls)+sum(p6__enrolment__girls)+sum(p7__enrolment__girls) as TotalGirls, count(inspection_date) as inspection_number,
    max(inspection_date) as last_inspection from tbl_random where district = '${nameOfDistrict}' group by district limit ${limit}`;


    
    let districtArray = [];
    let totalSchoolArray = [];
    let totalBoysArray = [];
    let totalGirlArray =[];
    let totalInspectionArray = [];
    let maxInspectionArray = [];

    connection.query(dQuery, function fill(err, result,){
        if (err) throw err;
       //let flag = 0;
       for(let i = 0; i < result.length; i++){
        // School
        let district = result[i].district;

        districtArray.push(district)

        // Processing total schools  for each district
        let sdistrict = [];
        for(let d = 1; d <= 1; d++){
          let scdistrict = `Totalschools`;
          sdistrict.push(result[i][scdistrict]);
        }
        totalSchoolArray.push(sdistrict);
  
        // Processing total number of boys in each district 
        let districtBoys = [];
        for(let c = 1; c <= 1; c++){
          let dboys = `TotalBoys`;
          districtBoys.push(result[i][dboys]);
        }
        totalBoysArray.push(districtBoys);

         // Processing total number of girls in each district 
         let districtGilrs = [];
        for(let s = 1; s <= 1; s++){
          let dgilrs = `TotalGirls`;
          districtGilrs.push(result[i][dgilrs]);
        }
        totalGirlArray.push(districtGilrs);

         // Processing total number of inspection in each district 
         let districtInspection = [];
        for(let s = 1; s <= 1; s++){
          let dinspection = `inspection_number`;
          districtInspection.push(result[i][dinspection]);
        }
        totalInspectionArray.push(districtInspection);
      
           // Processing latest inspection in each district 
           let latestInspection = [];
           for(let s = 1; s <= 1; s++){
             let maxinspection = `last_inspection`;
             latestInspection.push(result[i][maxinspection]);
           }
           maxInspectionArray.push(latestInspection);
         
        


      }

      // console.log("DISTRICT",districtArray);
      // console.log("TOTAL SCHOOLS", totalSchoolArray );
      // console.log("TOTAL BOYS", totalBoysArray);
      // console.log("TOTAL GIRLS", totalGirlArray);
      // console.log("TOTAL INSPECTION", totalGirlArray);
      console.log("lastet inspection", maxInspectionArray);

      let district = districtArray[0];
      let totalSchoolsData =  totalSchoolArray[0];
      let totalBoysData = totalBoysArray[0];
      let totalGrilsData =  totalGirlArray[0];
      let totalInspection = totalInspectionArray[0];
      let max_inspectionData = maxInspectionArray[0];
     

     res.send({district: district, school: totalSchoolsData, Boys: totalBoysData, Grils: totalGrilsData, inspection: totalInspection, max_inspection: max_inspectionData})

        })
      

             
    });


module.exports = router;















