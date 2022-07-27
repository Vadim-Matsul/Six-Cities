.Toggle {
     position: relative;
      padding: 10px 120px;
       margin: 10px;
}
.Toggle::before {
      content: '';
      display: block;
     position: absolute;
          top: 10;
         left: 0;
        width: 100px;
       height: 20px;
       margin: 0 10px;
border-radius: 20px;
   background: rgba(0, 0, 0, 0.22);
}
.ToggleActive {
     position: relative;
}
.ToggleActive::after {
      content: '';
      display: block;
     position: absolute;
          top: 10px;
         left: 0;
        width: 21px;
       height: 21px;
       margin: 0 10px;
border-radius: 50%;
       border: 1px solid black;
   background: rgba(112, 237, 49, 0.787);    
}
.ToggleDisActive {
     position: relative;
}
.ToggleDisActive::after {
      content: '';
      display: block;
     position: absolute;
          top: 10px;
         left: 79px;
        width: 21px;
       height: 21px;
       margin: 0 10px;
border-radius: 50%;
       border: 1px solid black;
   background: rgba(215, 5, 5, 0.787);    
}

.InputHelp {
      padding: 5px;
  margin-left: 15px;
   background: rgba(205, 134, 63, 0.409);
}  