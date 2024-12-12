import React from 'react';
import { ChevronDown, ChevronUp, Grid } from 'lucide-react';

const ElementContainer = ({ showElements, setShowElements, sidebarElements, setStatusCode, dispatch, counter, setCounter,addElement }) => {
    return(
                <div className="space-y-3" >
                  <div className="flex items-center justify-between">
                    <h3 className="flex items-center text-sm font-semibold text-gray-700">
                      <Grid className="w-4 h-4 mr-2" />
                      Elements
                    </h3>
                    <button
                      onClick={() => setShowElements((prev) => !prev)}
                      className="p-1 transition-all rounded-full hover:bg-red-100"
                    >
                      {showElements ? (
                        <ChevronUp className="w-4 h-4 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  </div>

                  {showElements && (
                    <div className="grid grid-cols-2 gap-2">
                      {Object.keys(sidebarElements).map((element) => (
                        <button
                          key={element}
                          onClick={() => {
                            setStatusCode(0);
                            const id = counter + 1;
                            const hash = id.toString();
                            setCounter((prev) => prev + 1);
                            dispatch(
                              addElement({
                                hash: hash,
                                value: sidebarElements[element](hash),
                              })
                            );
                          }}
                          className="px-3 py-2 text-sm text-gray-700 transition-all bg-white border border-gray-100 rounded-lg shadow-sm  hover:bg-red-50"
                        >
                          {element}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
    )
}
export default ElementContainer;