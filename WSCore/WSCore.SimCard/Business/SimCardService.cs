using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WSCore.Common.Business;
using WSCore.Infrastructure.UnitOfWork;
using WSCore.SimCard.Models;

namespace WSCore.SimCard.Business
{
    public class SimCardService : BaseService<Sim>, ISimCardService
    {
        private readonly IUnitOfWork _uow;
        public SimCardService(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public void AddLogicAsync()
        {
            try
            {
                Sim newEntity = new Sim
                {
                    Name = "0909874825",
                    Alias = "0909874825",
                    Content = "ddddd",
                    Price = 190000,
                    Discount = 180000,
                    Status = "publish"
                };

                _uow.GetRepository<Sim>().AddAsync(newEntity);

                _uow.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #region Import
        public void ImportFile()
        {
            try
            {
                string strDoc = @"C:\Users\Public\Downloads\Book1.xlsx";
                //Lets open the existing excel file and read through its content . Open the excel using openxml sdk
                using (SpreadsheetDocument doc = SpreadsheetDocument.Open(strDoc, false))
                {
                    //create the object for workbook part  
                    WorkbookPart workbookPart = doc.WorkbookPart;
                    Sheets thesheetcollection = workbookPart.Workbook.GetFirstChild<Sheets>();
                    List<Sim> simCards = new List<Sim>();
                    int sheetLevel = 1;
                    int Started = 1;
                    bool IsAdded = false;

                    //using for each loop to get the sheet from the sheetcollection
                    if (sheetLevel == 1)
                    {
                        foreach (Sheet thesheet in thesheetcollection)
                        {
                            //statement to get the worksheet object by using the sheet id  
                            Worksheet theWorksheet = ((WorksheetPart)workbookPart.GetPartById(thesheet.Id)).Worksheet;

                            SheetData thesheetdata = (SheetData)theWorksheet.GetFirstChild<SheetData>();
                            foreach (Row thecurrentrow in thesheetdata)
                            {
                                Sim simCardItem = new Sim();
                                foreach (Cell thecurrentcell in thecurrentrow)
                                {
                                    var holdData = "";
                                    //statement to take the integer value  
                                    string currentcellvalue = string.Empty;
                                    if (thecurrentcell.DataType != null)
                                    {
                                        if (thecurrentcell.DataType == CellValues.SharedString)
                                        {
                                            if (int.TryParse(thecurrentcell.InnerText, out int id))
                                            {
                                                SharedStringItem item = workbookPart.SharedStringTablePart.SharedStringTable.Elements<SharedStringItem>().ElementAt(id);
                                                if (item.InnerText != null)
                                                {
                                                    currentcellvalue = item.InnerText;
                                                }
                                            }
                                        }

                                        holdData = currentcellvalue;
                                    }
                                    else
                                    {
                                        holdData = thecurrentcell.InnerText ?? Convert.ToInt16(thecurrentcell.InnerText) + " ";
                                    }
                                    int tamp = GetCellNumber(thecurrentcell.CellReference.Value.ToString());
                                    if (tamp > Started && holdData != null)
                                    {
                                        IsAdded = true;
                                        string firstChar = thecurrentcell.CellReference.Value[0].ToString();
                                        if (firstChar == "A")
                                        {
                                            simCardItem.Name = holdData.ToString();
                                        }
                                        else if (firstChar == "B")
                                        {
                                            simCardItem.Alias = holdData.ToString();
                                        }

                                        simCardItem.Content = "Content";
                                        simCardItem.Status = "Pendding";
                                    }
                                    else
                                    {
                                        IsAdded = false;
                                    }
                                }
                                if (IsAdded)
                                {
                                    simCards.Add(simCardItem);
                                }
                            }
                            _uow.GetRepository<Sim>().AddRange(simCards);
                            _uow.SaveChanges();
                        }
                    }
                    sheetLevel++;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int GetCellNumber(string cellNumber)
        {
            string _cellNumber = "";
            _cellNumber = string.Join("", cellNumber.ToCharArray().Where(Char.IsDigit));
            return int.Parse(_cellNumber);
        }

        public string GetSimCardNumber(string simCardNumber)
        {
            string _simCardNumber = "";
            _simCardNumber = string.Join("", simCardNumber.ToCharArray().Where(Char.IsDigit));
            return _simCardNumber.Substring(0, 3);
        }
        #endregion
    }
}
