var ExcelJS = require('exceljs')
 
module.exports = function operation(data, filename) {
    var workbook = new ExcelJS.Workbook()

    workbook.created = new Date()
    workbook.modified = new Date()
    workbook.creator = `${new Date}`
    workbook.lastModifiedBy = `${new Date}`
 
    const worksheet =  workbook.addWorksheet('智能停车场管理订单', {
        pageSetup: { 
            paperSize: 9, 
            orientation:'landscape' 
        }
    })
    worksheet.headerFooter.differentFirst = true
    worksheet.headerFooter.firstHeader = '&L&I&\"等线\"&20智能停车场管理订单'

    worksheet.pageSetup.margins = {
        left: 0.25, right: 0.25,
        top: 0.75, bottom: 0.75,
        header: 0.3, footer: 0.3
    }
 
    worksheet.columns = [
        { header: '编号', key: 'index', width: 12 },
        { header: '车牌号', key: 'carId', width: 10 },
        { header: '车场', key: 'parkId', width: 10 },
        { header: '进场通道', key: 'inparkway', width: 14 },
        { header: '出场通道', key: 'outparkway', width: 14 },
        { header: '支付状态', key: 'payStatus', width: 14},
        { header: '支付方式', key: 'payway', width: 14},
        { header: '金额', key: 'money', width: 10 },
        { header: '开始时间', key: 'start', width: 22 },
        { header: '结束时间', key: 'end', width: 22 }
    ]
    worksheet.addRows(data)

    worksheet.eachRow(function(row, rowNumber) {
        row.alignment = {
            vertical: 'middle', horizontal: 'center' 
        }
        row.eachCell(function(cell, colNumber) {
            cell.border = {
                top: { style:'thin' },
                left: { style:'thin' },
                bottom: { style:'thin' },
                right: { style:'thin' }
            }
        })
        if (rowNumber === 1) {
            row.height = 43.75
            row.font = { 
                name: '等线',
                bold: true,
                size: 12
            }
        } else {
            row.height = 22.5
            row.font = {
                name: '等线'
            }
        }
    })
 
    workbook.xlsx.writeFile(`./public/download/${filename}.xlsx`)
    .catch(err => {
        console.log(err)
    })
}
