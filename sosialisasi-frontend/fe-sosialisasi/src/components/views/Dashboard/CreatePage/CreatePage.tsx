import DashboardLayout from "@/components/layouts/DashboardLayout";
import useCreatePage from "./useCreatePage";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";
import { Spinner } from "@heroui/react";
import { useSession } from "next-auth/react";

const CreatePage = () => {
  const { data: session } = useSession();
  const {
    control,
    errors,
    preview,
    isPending,
    handleSubmitForm,
    handleCreatePost,
  } = useCreatePage();

  const CATEGORIES = ["All", "Competition", "Project"] as const;

  return (
    <DashboardLayout>
      <form
        onSubmit={handleSubmitForm(handleCreatePost)}
        className="mx-auto flex w-full max-w-4xl flex-col"
      >
        <article className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-row items-center gap-5">
            <img
              src={
                `http://localhost:3001${session?.user?.image}` ||
                "/images/logo.png"
              }
              alt="Avatar"
              className="h-14 w-14 rounded-full bg-black object-cover"
            />

            <div>
              <h3 className="text-lg font-medium text-[#202020] sm:text-xl">
                {session?.user?.name || "Loading..."}
              </h3>
              <h4 className="text-sm text-[#787878] sm:text-base">
                {session?.user?.email || "Loading..."}
              </h4>
            </div>
          </div>

          <Controller
            name="type_content"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="mt-6 flex flex-col gap-4">
                <h2 className="text-lg font-medium text-[#202020] sm:text-xl">
                  Choose Category
                </h2>
                {/* flex-wrap ditambahkan agar kategori turun ke bawah jika tidak cukup tempat */}
                <div className="flex flex-row flex-wrap items-center gap-3">
                  {CATEGORIES.map((cat) => (
                    <div
                      key={cat}
                      onClick={() => onChange(cat)}
                      className={cn(
                        "flex cursor-pointer flex-row items-center gap-2 rounded-full px-5 py-2 sm:px-6 sm:py-3",
                        value === cat
                          ? "bg-[#5568FE] text-white"
                          : "bg-[#E5E7EB] text-[#787878]",
                      )}
                    >
                      <p className="text-sm font-medium sm:text-base">{cat}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          />

          <div className="mt-6 flex flex-col gap-2">
            <h2 className="text-lg font-medium text-[#202020] sm:text-xl">
              Post Description
            </h2>
            <Controller
              name="text_content"
              control={control}
              render={({ field }) => (
                <div className="rounded-2xl border border-[#ADAEBC] p-4 sm:p-7">
                  <textarea
                    {...field}
                    placeholder="Write something to share…"
                    className="h-48 w-full resize-none text-base whitespace-pre-wrap focus:outline-none sm:text-lg"
                  />
                </div>
              )}
            />
            {errors.text_content && (
              <p className="text-sm text-red-500">
                {errors.text_content.message}
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <h2 className="text-lg font-medium text-[#202020] sm:text-xl">
              Add Pictures
            </h2>
            <Controller
              name="file"
              control={control}
              render={({ field: { onChange } }) => (
                <label
                  htmlFor="fileUpload"
                  className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-[#ADAEBC] py-14 hover:bg-gray-50"
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="mt-3 h-full w-full rounded-lg border object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      <i className="fa-solid fa-camera text-4xl text-[#787878]"></i>
                      <p className="text-xl font-medium text-[#787878]">
                        Add Picture(s)
                      </p>
                      <p className="text-base text-[#787878]">
                        Click to browse
                      </p>
                    </div>
                  )}
                  <input
                    id="fileUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => onChange(e.target.files)}
                  />
                </label>
              )}
            />
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="flex w-auto min-w-[120px] flex-row items-center justify-center gap-3 rounded-lg bg-[#5568FE] p-3 text-white hover:bg-[#5568FE]/80 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {isPending ? (
                <Spinner color="white" size="sm" />
              ) : (
                <>
                  <i className="fas fa-paper-plane text-xl"></i>
                  <h2 className="text-lg font-bold">Post</h2>
                </>
              )}
            </button>
          </div>
        </article>
      </form>
    </DashboardLayout>
  );
};

export default CreatePage;
