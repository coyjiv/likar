"use client";
import withAuth from "@/hooks/withAuth";
import withApplicationShell from "../components/AppShell";
import { Key, useState } from "react";
import { isEmpty, isLoaded, useFirestore } from "react-redux-firebase";
import { Button } from "@mantine/core";
import { useAppSelector } from "@/hooks/redux";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { UrlObject } from "url";

const LabResults = () => {
  const [labResults, setlabResults] = useState([1]);
  const links = useAppSelector((state) => state.firebase.profile.labResults);
  return (
    <div className="w-full h-full">
      {links?.length === 0 || isEmpty(links) ? (
        <div className="flex gap-3 items-center justify-center mt-5">
          <h1 className="mt-72 font-medium flex text-4xl p-8 ">
            Наразі Ви не маєте результатів аналізів
          </h1>
        </div>
      ) : (
        <div className=" gap-3 items-center mt-5">
          <h1 className="text-2xl font-medium ml-5">
            Ваші результати аналізів
          </h1>
          <div className="grid grid-cols-4 gap-4">
            {links &&
              links.map(
                (
                  labResult: string | UrlObject,
                  index: Key | null | undefined
                ) => (
                  <Link href={labResult} key={index}>
                    <div className="mt-10 py-0 lg:py-4 px-8 lg:px-8 flex flex-col justify-center bg-slate-400/30 w-full h-full ">
                      <p className="text-center">card with labresults</p>
                      <Button className="mt-10 flex justify-center lg:w-full bg-slate-300 duration-300 text-black hover:text-white hover:bg-slate-500">
                        <p className="text-sm lg:text-md hidden lg:block">
                          Завантажити
                        </p>
                        <p>
                          <ArrowDownTrayIcon
                            width={25}
                            className="block lg:hidden"
                          />
                        </p>
                      </Button>
                    </div>
                  </Link>
                )
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(withApplicationShell(LabResults));
