export const useHelper = () =>
{
    const abbrNum = (number:any, decPlaces:any) =>
    {
        // 2 decimal places => 100, 3 => 1000, etc
        decPlaces = Math.pow(10,decPlaces);
    
        // Enumerate number abbreviations
        var abbrev = [ "K", "M", "B", "T" ];
    
        // Go through the array backwards, so we do the largest first
        for (var i=abbrev.length-1; i>=0; i--) 
        {
    
            var size = Math.pow(10,(i+1)*3);
    
            if(size <= number) 
            {
                 number = Math.round(number*decPlaces/size)/decPlaces;
    
                 if((number == 1000) && (i < abbrev.length - 1)) 
                 {
                     number = 1;
                     i++;
                 }
                     
                 number += abbrev[i];
    
                 break;
            }
        }
    
        return number;
    }

    return { abbrNum }
}